import { notificationService } from "../services/notification.service";
import { notificationValidator } from "../validators/notification.validator";

export const postNotification = async (req, res) => {
  try {
    const result = notificationValidator.notification.safeParse(req.body);
    if (!result.success) {
      return res
        .status(400)
        .json({ errors: result.error.flatten().fieldErrors });
    }
  } catch (error) {
    const notification = await notificationService.postNotification(req.body, req.user.userId)
  }
};

export const getNotification = async (req, res) => {
  try {
    const notifications = await notificationService.getNotification(
      req.user.userId,
    );
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(error.statusCode || 500).json({ success: false, error });
  }
};
