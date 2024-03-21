interface AdminPageProps {
  adminToken: string;
}

function Admin(props: AdminPageProps) {
  if (props.adminToken === "DummyToken") {
    return (
      <div>
        <h1>Admin Page</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    );
  }
}

export default Admin;
