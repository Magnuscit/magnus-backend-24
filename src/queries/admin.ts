const getAdminPassword: string = "SELECT password FROM admin WHERE id = $1";

const AdminQueries = {
  getAdminPassword,
};

export default AdminQueries;
