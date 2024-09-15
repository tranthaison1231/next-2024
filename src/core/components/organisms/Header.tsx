import { getMe } from "@/core/services/user";
import Navbar from "./Navbar";

export default async function Header() {
  const me = await getMe();

  return <Navbar me={me} />;
}
