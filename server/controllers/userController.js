import userModel from "../models/userModel.js";
export const getUserData = async (req, res) => {
    try {
      // Get userId from query params
      const { userId } = req.query;
  
      // Use findOne to search by userId, not findById
      const user = await userModel.findOne({ _id: userId });
  
      if (!user) {
        return res.json({
          success: false,
          message: "User Not Found"
        });
      }
  
      res.json({
        success: true,
        userData: {
          name: user.name,
          isAccountVerified: user.isAccountVerified
        }
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message
      });
    }
  };
  