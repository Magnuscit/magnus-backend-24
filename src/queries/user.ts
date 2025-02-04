const getUserClg = "SELECT clg_name FROM users WHERE email = $1;";

const doesUserExists = "SELECT * FROM users WHERE email = $1;";

const addUser = "INSERT INTO users (email) VALUES ($1);";
const updateUser = `
UPDATE users 
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
    SELECT 
        u.name, 
        u.phone_no, 
        u.clg_name,
        u.email,
        COALESCE(array_agg(ue.event_id) FILTER (WHERE ue.event_id IS NOT NULL), '{}') event_id
    FROM users u
    LEFT JOIN users_events ue ON u.email = ue.user_email
    WHERE u.email = $1
    GROUP BY u.name, u.phone_no, u.clg_name, u.email;`;

const UserQueries = {
  getUser,
  getUserClg,
  doesUserExists,
  updateUser,
  addUser,
  doesUserFullyRegister,
};

export default UserQueries;
