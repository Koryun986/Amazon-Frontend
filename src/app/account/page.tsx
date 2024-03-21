import {Metadata} from "next";
import AccountPage from "./_components/AccountPage";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Amazon Account",
        description: "Register and make orders easily"
    };
}

export default async function Page() {
    return (
        <AccountPage />
    )
}