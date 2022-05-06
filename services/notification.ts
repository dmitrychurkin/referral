import { NotificationManager } from 'react-notifications';

export enum SeverityLevel {
    ERROR = 1,
    WARNING,
    INFO,
    SUCCESS
};

const NotificationAdapter = {
    [SeverityLevel.ERROR]: NotificationManager.error.bind(NotificationManager),
    [SeverityLevel.WARNING]: NotificationManager.warning.bind(NotificationManager),
    [SeverityLevel.INFO]: NotificationManager.info.bind(NotificationManager),
    [SeverityLevel.SUCCESS]: NotificationManager.success.bind(NotificationManager)
}

type NotificationManagerOptions = {
    readonly message: string;
    readonly title?: string;
    readonly timeOut?: number;
    readonly callback?: () => void;
    readonly priority?: boolean;
};

const showNotification = (options: NotificationManagerOptions, severityLevel: SeverityLevel) => {
    const { message, title, timeOut, callback, priority } = options;

    NotificationAdapter[severityLevel](
        message,
        title,
        timeOut,
        callback,
        priority
    );
};

export default showNotification;
