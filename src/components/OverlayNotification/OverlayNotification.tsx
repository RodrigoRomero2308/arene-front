import { Notification, NotificationProps } from "@mantine/core";
import { memo, useMemo, useState } from "react";
import "./OverlayNotification.css";

function OverlayNotification(notificationProps: NotificationProps) {
  const [closing, setclosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const transitionDuration = 1;

  const notificationsClassnames = useMemo(() => {
    let result = "overlayNotification";

    if (closing) {
      result = result + " overlayNotificationClosed";
    }

    return result;
  }, [closing]);

  const onClose = () => {
    setclosing(true);
    if (notificationProps.onClose) notificationProps.onClose();
    setTimeout(() => {
      setVisible(false);
    }, transitionDuration * 1000);
  };

  if (!visible) {
    return null;
  }

  return (
    <Notification
      styles={{
        root: {
          transitionDuration: `${transitionDuration}s`,
        },
      }}
      className={notificationsClassnames}
      {...notificationProps}
      onClose={onClose}
    />
  );
}

export default memo(OverlayNotification);
