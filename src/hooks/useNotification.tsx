import { NotificationType } from "@/enums/notificationType";
import { Notification, ThemeIcon } from "@mantine/core";
import { useState } from "react";
import { Check, X, InfoCircle } from "tabler-icons-react";

const useNotification = () => {
  const [visible, setVisible] = useState(false);
  const [notificationProps, setNotificationProps] = useState<{
    title: string;
    message: string;
    type: NotificationType;
  }>();

  let iconElement = <InfoCircle />;
  let color: string | undefined = undefined;

  if (notificationProps?.type === NotificationType.ERROR) {
    iconElement = <X />;
    color = "red";
  } else if (notificationProps?.type === NotificationType.SUCCESS) {
    iconElement = <Check />;
    color = "teal";
  }

  const dismissNotification = () => {
    setVisible(false);
  };

  const component = (
    <Notification
      sx={() => ({
        position: "fixed",
        display: visible ? undefined : "none",
        bottom: 10,
        right: 10,
      })}
      color={color}
      onClose={dismissNotification}
      icon={iconElement}
      title={notificationProps?.title}
    >
      {notificationProps?.message}
    </Notification>
  );

  const presentNotification = (props: {
    title: string;
    message: string;
    type: NotificationType;
  }) => {
    setVisible(true);
    setNotificationProps(props);
  };

  return {
    component,
    presentNotification,
    dismissNotification,
  };
};

export default useNotification;
