import QRCode from "qrcode";
import { ses } from "../../../config";

const sendBoardingPass = async (
  userEmail: string,
  userClg: string,
  eventName: string,
) => {
  const qr = await QRCode.toDataURL(userEmail);
  const data = {
    from: process.env.SES_VERIFIED_EMAIL,
    to: userEmail,
    attachments: [
      {
        filename: "qr.png",
        path: qr,
        cid: "qr",
      },
    ],
    subject: "Your Payment For Magnus'25 was successfull",
    html: `
        <html>
           <div style="box-sizing: border-box; background: gray; padding: 3%;">
                 <table id="content" colspan="4" style="background: white; width: 100%">
                    <tr style="height: 15vh">
                       <td>&nbsp;</td>
                       <td colspan="2" align="center">
                          <img src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/tklogo.png" alt="logo"/>
                       </td>
                      <td>&nbsp;</td>
                    </tr>
                    <tr style="font-size: 1.2em" >
                       <td colspan="4" style="font-family: monospace; vertical-align: center;
                           padding: 2em">
                      <p>
                        Greetings,
                        <br><br>
                        Welcome aboard the Magnus'25! 🚂 Today's the day we embark on a journey of discovery, laughter, and maybe a few surprises along the way. As you step into our virtual wonderland of knowledge, here's a little guide to make the most of your experience.

                        <li> Please find your boarding pass attached with this mail</li>
                        <li> This pass grants you entry to all of your registered events</li>
                        <li> Check the website for the rules and regulation for each event</li>
                        <br>
                        Get ready to immerse yourself in extravaganza at Magnus'25! This event promises to be a vibrant blend of entertainment and enlightenment – Let’s enjoy!
                        <br><br>
                        Welcome,
                        <br><br>
                        Team Magnus
                        <br>
                        CSE-AIML
                        <br>
                        Chennai Institute of Technology
                          </p>
                    </tr>
                    <tr>
                        <td colspan=4 align="center">
                       <div style="font-family: monospace;">
                          <div style="display: flex;max-width: 750px;max-height: 277px;">
                             <div style="width:70%;border:2px dashed#a0a0a0;border-radius: 15px;text-align: left; padding: 10px; box-sizing: border-box;">
                                <p style="font-size: 10px;margin: 6px 0px 0px 10px;">Boarding<br/>Date: 17 Feb 2025</p>
                                <p style="font-size: 10px;margin: 8px 0px 0px 10px;">from ${userClg} to CIT</p>
                                <p style="font-size: 20px;margin: 50px 0px 0px 5px;">${eventName}</p>
                             </div>
                             <div style="background: #ececec;border-radius: 15px; width: 30%;padding: 40px 10px 40px 10px;">
                                <p>
                                <img alt="qr" width="172px" height="172px" src="cid:qr">
                                </p>
                                <img src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/tklogo.png" alt="logo" width="136px" height="32px">
                             </div>
                          </div>
                       <div>
                       </td>
                    </tr>
                    <tr style="vertical-align: top">
                       <td style="font-family: monospace; vertical-align: middle; padding: 2em;
                           width: 25%;">
                          <div style="text-align: justify">
                             <p style="margin: 4px"><b>contact</b></p>
                             <p style="margin: 2px">6369265318</p>
                             <p style="margin: 2px">8248493521</p>
                          </div>
                       </td>
                       <td style="font-family: monospace; vertical-align: middle; padding: 2em;  width: 25%;">
                          <div style="text-align: justify">
                             <p style="margin: 4px"><b>email</b></p>
                             <p style="margin: 2px">magnus@citchennai.net</p>
                          </div>
                       </td>
                       <td style="font-family: monospace; vertical-align: middle; padding: 2em;  width: 25%;">
                          <div style="text-align: justify">
                             <p style="margin: 4px"><b>visit us</b></p>
                             <p style="margin: 2px"><a href="www.magnuscit.live">www.magnuscit.live</a></p>
                          </div>
                       </td>
                       <td style="font-family: monospace; vertical-align: middle; padding: 2em;  width: 25%;">
                          <p style="margin: 4px"><b>socials</b></p>
                          <div style="display: flex;justify-content: left;margin: 4px;text-align: justify;">
                             <a href="https://www.facebook.com/cittakshaskila" >
                             <img alt="F" src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/fb.png" style="width: 15px; height: 15px; padding: 2px" />
                             </a>
                             <a href="https://www.github.com/cittakshashila" >
                             <img alt="G" src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/github.png" style="width: 15px; height: 15px; padding: 2px" />
                             </a>
                             <a href="https://www.instagram.com/cittakshaskila" >
                             <img alt="I" src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/insta.png" style="width: 15px; height: 15px; padding: 2px"/>
                             </a>
                             <a href="https://twitter.com/cittakshashila" >
                             <img alt="T" src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/x.png" style="width: 15px; height: 15px; padding: 2px"/>
                             </a>
                          </div>
                       </td>
                    </tr>
                    <tr>
                       <td colspan="4" style="font-family: monospace; vertical-align: center; padding: 2em">
                          <p style="text-align: center">
                             © 2025 Magnus. All rights reserved.
                          </p>
                       </td>
                    </tr>
                 </table>
              </div>
        </html>				`,
  };
  try {
    await ses.sendMail(data);
    console.log(`boarding pass sent successfully to ${userEmail}`);
  } catch (error) {
    console.error(`Error sending boarding pass to email: ${userEmail}:`, error);
  }
};

const sendRegistrationEmail = async (name: string, email: string) => {
  const data = {
    from: process.env.VERIFIED_EMAIL,
    to: email,
    subject: "Your Registration Confirmation for Magnus 2025",
    html: `
    <html>
      <body style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background: gray; padding: 3%; text-align: center;">
          <table style="background: white; width: 100%; border-collapse: collapse;">
            <tr>
              <td colspan="4">
                <img src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/tklogo.png" alt="Magnus Logo" />
              </td>
            </tr>
            <tr>
              <td colspan="4" style="padding: 20px; text-align: left;">
                <p>Hi ${name},</p>
                <p>🎉 Congratulations! Your registration for Magnus 2025 has been successfully received. We're excited to have you join us for this symposium.</p>
                <p><b>Important Information:</b></p>
                <ul>
                  <li>Arrive at least 30 minutes before your registered events.</li>
                  <li>Follow all event rules and eligibility criteria.</li>
                  <li>Carry a valid college ID for verification.</li>
                  <li>Familiarize yourself with the schedule and venue.</li>
                </ul>
                <p>For any questions or assistance, contact our event coordinators.</p>
                <p>Looking forward to seeing you at Magnus 2025!</p>
                <p><b>Best Regards,</b><br>Magnus Team<br>Chennai Institute of Technology</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px;"><b>Contact</b><br>6369265318, 8248493521</td>
              <td style="padding: 10px;"><b>Email</b><br>magnus@citchennai.net</td>
              <td style="padding: 10px;"><b>Website</b><br><a href="https://www.magnuscit.live">magnuscit.live</a></td>
              <td style="padding: 10px;"><b>Socials</b><br>
                <a href="https://www.facebook.com/cittakshaskila"><img src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/fb.png" width="15" height="15"/></a>
                <a href="https://www.github.com/cittakshashila"><img src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/github.png" width="15" height="15"/></a>
                <a href="https://www.instagram.com/cittakshaskila"><img src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/insta.png" width="15" height="15"/></a>
                <a href="https://twitter.com/cittakshashila"><img src="https://raw.githubusercontent.com/cittakshashila/backend/ses/docs/asserts/x.png" width="15" height="15"/></a>
              </td>
            </tr>
            <tr>
              <td colspan="4" style="text-align: center; padding: 10px;">© 2025 Magnus. All rights reserved.</td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `,
  };
  try {
    await ses.sendMail(data);
    console.log(`Registration Email sent successfully to ${email}`);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
};

export { sendBoardingPass, sendRegistrationEmail };
