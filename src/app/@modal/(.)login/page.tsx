import { Modal } from "@/core/components/ui/modal";
import LoginContainer from "@/features/login/LoginContainer";

export default async function Login() {
  return (
    <Modal>
      <LoginContainer />
    </Modal>
  );
}
