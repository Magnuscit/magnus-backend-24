const getUserClg = "SELECT clg_name FROM users WHERE email = $1;";

const doesUserExists = "SELECT * FROM users WHERE email = $1;";

const addUser = "INSERT INTO users (email) VALUES ($1);";
const updateUser = `
UPDATE your_table
SET name = $1, 
    clg_name = $2, 
    phone_no = $3
WHERE email = $4;
`;

const doesUserFullyRegister = `SELECT EXISTS (
  SELECT 1 FROM users
  WHERE email = $1 AND (name IS NULL OR clg_name IS NULL OR phone_no IS NULL)
) AS has_null`;

const getUser = `
      WITH user_basic AS (
        SELECT 
          u.name,
          u.clg_name,
          u.phone_no,
          u.email
        FROM users u
        WHERE u.email = $1
      ),
      event_details AS (
        SELECT 
          ue.event_id,
          json_agg(
            json_build_object(
              'email', tm.email,
              'clg_name', tm.clg_name,
              'phone_no', tm.phone_no
            )
          ) FILTER (WHERE tm.email IS NOT NULL) as team_members
        FROM users_events ue
        LEFT JOIN team_members tm ON tm.event_id = ue.event_id 
          AND tm.team_leader_email = ue.user_email
        WHERE ue.user_email = $1
        GROUP BY ue.event_id
      )
      SELECT 
        ub.*,
        COALESCE(
          json_agg(
            json_build_object(
              'event_id', ed.event_id,
              'team_members', COALESCE(ed.team_members, '[]'::json)
            )
          ) FILTER (WHERE ed.event_id IS NOT NULL),
          '[]'::json
        ) as events
      FROM user_basic ub
      LEFT JOIN event_details ed ON 1=1
      GROUP BY ub.name, ub.clg_name, ub.phone_no, ub.email
    `;

const UserQueries = {
  getUser,
  getUserClg,
  doesUserExists,
  updateUser,
  addUser,
  doesUserFullyRegister,
};

export default UserQueries;
