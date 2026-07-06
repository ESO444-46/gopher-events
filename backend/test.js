// const { error } = await SendEmail(
//     {
//         to: user.email,
//         subject: "Welcome to GopherEvents!",
//         text: "Hey! Welcome to GopherEvents. Start exploring events on your campus!"
//     });
// if (error) console.log('Signup email failed', error)

const date_future = new Date(Date.now() + 3 * 60 * 1000)
const date_past = new Date(Date.now() - 3 * 60 * 1000)
