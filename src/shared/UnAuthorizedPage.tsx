import Link from "next/link";
import {Button} from "antd";

const UnAuthorizedPage = () => {
  return (
    <div className="h-screen flex justify center items-center flex-col gap-4">
      <div className="text-3xl font-bold">Create account or log in</div>
      <Link href="/auth/login">
        <Button>Login</Button>
      </Link>
      <Link href="/auth/registration">
        <Button>Registration</Button>
      </Link>
    </div>
  )
};

export default UnAuthorizedPage;