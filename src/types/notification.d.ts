interface INotification {
    title: string;
    message: string;
    status: "success" | "error" | "pending";
}