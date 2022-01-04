using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyMoviesInfrastructure.Helpers
{
    public class EmailService
    {
        public static void SendRegisterEmail(string Email, string ConfirmationLink)
        {
            MimeMessage msg = new MimeMessage();

            msg.From.Add(new MailboxAddress("MyMoviesTeam", "gestionescolar1234@gmail.com"));

            msg.To.Add(MailboxAddress.Parse(Email));

            msg.Subject = "Email Confirmation";

            msg.Body = new TextPart("plain")
            {
                Text = $@"Hi, follow this link to confirm your account:
                        ${ConfirmationLink}

                If you don't confirm your account, you will not be able to log in into the web,
                Regards!,
                MyMoviesTeam"
            };

            SmtpClient client = new SmtpClient();

            try
            {
                client.Connect("smtp.gmail.com", 465, true);
                client.Authenticate("gestionescolar1234@gmail.com", "gestionescolar1901");
                client.Send(msg);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}
