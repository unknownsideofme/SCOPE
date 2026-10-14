import Database from "../dbClass/dbClass.js";

export default class Milestone {
    constructor() {
        this.mile_id       = null;
        this.project_id    = null;
        this.mile_name     = null;
        this.description   = null;
        this.status        = null;
        this.parent_mile_id = null;
        this.budget        = null;
    }

    setter(mile_id, project_id, mile_name, description, status, parent_mile_id, budget) {
        this.mile_id        = mile_id;
        this.project_id     = project_id;
        this.mile_name      = mile_name;
        this.description    = description;
        this.status         = status;
        this.parent_mile_id = parent_mile_id;
        this.budget         = budget;
    }

    getter() {
        return {
            mile_id:        this.mile_id,
            project_id:     this.project_id,
            mile_name:      this.mile_name,
            description:    this.description,
            status:         this.status,
            parent_mile_id: this.parent_mile_id,
            budget:         this.budget,
        };
    }

    #rowToSetter(row) {
        this.setter(
            row.mile_id,
            row.project_id,
            row.mile_name,
            row.description,
            row.status,
            row.parent_mile_id,
            row.budget
        );
    }

    // ── CREATE ────────────────────────────────────────────────────────────────
    async createNew(project_id, mile_name, description, status, parent_mile_id, budget) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `INSERT INTO public.milestone
                    (project_id, mile_name, description, status, parent_mile_id, budget)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 RETURNING *;`,
                [project_id, mile_name, description, status, parent_mile_id, budget]
            );
            this.#rowToSetter(result.rows[0]);
            return result.rows[0];
        } catch (err) {
            throw new Error(err);
        }
    }

    // ── CREATE MANY (bulk insert with parent-child linking) ───────────────────
    /**
     * Insert multiple milestones at once, preserving parent → child order.
     *
     * Each item in the array can have:
     *   { project_id, mile_name, description, status, budget,
     *     temp_id,          ← any unique client-side key (string or number)
     *     parent_temp_id }  ← temp_id of this item's parent (omit for roots)
     *
     * Everything runs in one transaction — if any insert fails, all roll back.
     *
     * Returns Map<temp_id, insertedRow> so callers get the real mile_ids.
     *
     * Example input:
     *   [
     *     { temp_id: 'a', mile_name: 'Phase 1', ... },
     *     { temp_id: 'b', parent_temp_id: 'a', mile_name: 'Design', ... },
     *     { temp_id: 'c', parent_temp_id: 'a', mile_name: 'Build',  ... },
     *     { temp_id: 'd', parent_temp_id: 'b', mile_name: 'Wireframes', ... },
     *   ]
     */
    static async createMany(milestones) {
        const pool = Database.getInstance().client;

        // ── 1. Topological sort (parents before children) ─────────────────
        const byTempId = new Map(milestones.map(m => [m.temp_id, m]));
        const sorted   = [];
        const visited  = new Set();

        function visit(m) {
            if (visited.has(m.temp_id)) return;
            if (m.parent_temp_id != null) {
                const parent = byTempId.get(m.parent_temp_id);
                if (!parent) throw new Error(
                    `parent_temp_id '${m.parent_temp_id}' not found in the input array`
                );
                visit(parent);
            }
            visited.add(m.temp_id);
            sorted.push(m);
        }
        for (const m of milestones) visit(m);

        // ── 2. Insert in a transaction ────────────────────────────────────
        /** @type {Map<string|number, object>} temp_id → inserted DB row */
        const result = new Map();

        await pool.query('BEGIN');
        try {
            for (const m of sorted) {
                // Resolve parent_temp_id → real DB mile_id
                const real_parent_id = m.parent_temp_id != null
                    ? result.get(m.parent_temp_id)?.mile_id ?? null
                    : null;

                const { rows } = await pool.query(
                    `INSERT INTO public.milestone
                        (project_id, mile_name, description, status, parent_mile_id, budget)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     RETURNING *;`,
                    [
                        m.project_id,
                        m.mile_name,
                        m.description   ?? null,
                        m.status        ?? null,
                        real_parent_id,
                        m.budget        ?? null,
                    ]
                );
                result.set(m.temp_id, rows[0]);
            }
            await pool.query('COMMIT');
        } catch (err) {
            await pool.query('ROLLBACK');
            throw new Error(`createMany failed, all inserts rolled back: ${err.message}`);
        }

        return result;  // Map<temp_id, { mile_id, mile_name, parent_mile_id, ... }>
    }

    // ── UPDATE ────────────────────────────────────────────────────────────────
    async update(mile_name, description, status, parent_mile_id, budget) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `UPDATE public.milestone
                 SET mile_name = $1, description = $2, status = $3,
                     parent_mile_id = $4, budget = $5
                 WHERE mile_id = $6
                 RETURNING *;`,
                [mile_name, description, status, parent_mile_id, budget, this.mile_id]
            );
            this.#rowToSetter(result.rows[0]);
            return result.rows[0];
        } catch (err) {
            throw new Error(err);
        }
    }

    // ── DELETE ────────────────────────────────────────────────────────────────
    async delete() {
        const pool = Database.getInstance().client;
        try {
            await pool.query(
                `DELETE FROM public.milestone WHERE mile_id = $1;`,
                [this.mile_id]
            );
            this.setter(null, null, null, null, null, null, null);
        } catch (err) {
            throw new Error(err);
        }
    }

    // ── GET ONE ───────────────────────────────────────────────────────────────
    async getInfo(mile_id) {
        const pool = Database.getInstance().client;
        try {
            const result = await pool.query(
                `SELECT * FROM public.milestone WHERE mile_id = $1;`,
                [mile_id]
            );
            if (result.rows.length === 0) return null;
            this.#rowToSetter(result.rows[0]);
            return result.rows[0];
        } catch (err) {
            throw new Error(err);
        }
    }

    // ── GET TREE ──────────────────────────────────────────────────────────────
    /**
     * Fetches all milestones for a project using a recursive CTE,
     * then builds a Map:
     *
     *   Map<mile_id, {
     *     mile_id, project_id, mile_name, description, status,
     *     parent_mile_id, budget, depth, path_names,
     *     children: mile_id[]   ← IDs of direct children
     *   }>
     *
     * Root milestones (parent_mile_id IS NULL) are also stored under
     * the special key 'roots' as an array of mile_ids.
     */
    static async getTree(project_id) {
        const pool = Database.getInstance().client;

        const { rows } = await pool.query(
            `WITH RECURSIVE mile_tree AS (
                -- anchor: root milestones for this project
                SELECT
                    m.mile_id,
                    m.project_id,
                    m.mile_name,
                    m.parent_mile_id,
                    m.status,
                    m.budget,
                    m.description,
                    1                       AS depth,
                    ARRAY[m.mile_id]        AS path,
                    m.mile_name::text       AS path_names
                FROM milestone m
                WHERE m.parent_mile_id IS NULL
                  AND m.project_id = $1

                UNION ALL

                -- recursive: children of already-found rows
                SELECT
                    c.mile_id,
                    c.project_id,
                    c.mile_name,
                    c.parent_mile_id,
                    c.status,
                    c.budget,
                    c.description,
                    t.depth + 1,
                    t.path || c.mile_id,
                    t.path_names || ' > ' || c.mile_name
                FROM milestone c
                JOIN mile_tree t ON c.parent_mile_id = t.mile_id
                WHERE NOT c.mile_id = ANY(t.path)   -- guards circular links
            )
            SELECT
                mile_id,
                project_id,
                mile_name,
                parent_mile_id,
                status,
                budget,
                description,
                depth,
                path_names
            FROM mile_tree
            ORDER BY path;`,
            [project_id]
        );

        // ── Build the Map ─────────────────────────────────────────────────
        /** @type {Map<number|'roots', object|number[]>} */
        const tree = new Map();
        const roots = [];

        // First pass — populate every node with an empty children array
        for (const row of rows) {
            tree.set(row.mile_id, { ...row, children: [] });
        }

        // Second pass — link children to parents
        for (const row of rows) {
            if (row.parent_mile_id === null) {
                roots.push(row.mile_id);
            } else {
                const parent = tree.get(row.parent_mile_id);
                if (parent) parent.children.push(row.mile_id);
            }
        }

        tree.set('roots', roots);   // convenience key for top-level nodes
        return tree;
    }
}