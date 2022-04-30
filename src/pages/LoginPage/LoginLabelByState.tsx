import OverlayNotification from "@/components/OverlayNotification/OverlayNotification";
import { ReactElement } from "react";
import { LoginRedirectAction } from "./LoginRedirectActions";

export default function LoginLabelByState(props: { state?: any }) {
  const { state } = props;
  let renderResult: ReactElement<any, any> | null = null;

  if (!state) {
    return null;
  }

  switch (state.redirectAction) {
    case LoginRedirectAction.REGISTER_SUCCESSFULLY:
      renderResult = (
        <OverlayNotification disallowClose>
          Ahora puedes iniciar sesión con tu cuenta
        </OverlayNotification>
      );
      break;
    default:
      break;
  }

  return renderResult;
}
