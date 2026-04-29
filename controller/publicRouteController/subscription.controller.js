import {
  createMailSubscriptionService,
  fetchSubscribedEmailsService,
  findSubscriptionByEmail,
} from "../../services/publicRouteService.js";

const mailSubscription = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isAlreadySubscribed = await findSubscriptionByEmail(email);
    if (isAlreadySubscribed) {
      return res.status(422).json({
        success: false,
        message: "You are already subscribed.",
      });
    }
    await createMailSubscriptionService(email);
    res.status(200).json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getSubscribedEmails = async (req, res, next) => {
  try {
    const emails = await fetchSubscribedEmailsService();
    res.status(200).json({
      success: true,
      message: "Subscribed Emails fetched",
      data: emails,
    });
  } catch (error) {
    next(error);
  }
};
export { mailSubscription, getSubscribedEmails };
