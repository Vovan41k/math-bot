require('dotenv').config()
const token = process.env.TOKEN
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(token, { polling: true });
const questions = [
    ['6+6', 26, 13, 12, 23, 12],
    ['7+27', 45, 65, 73, 34, 34],
    ['24+32', 98, 56, 20, 10, 56]
]
bot.onText(/\/math/, (msg, match) => {


    const random = (num) => {
        const res = Math.floor(Math.random() * num)
        return res
    }
    const index = random(questions.length)

    try {
        const chatId = msg.chat.id;
        const question = questions[index]
        bot.sendMessage(chatId, question[0], {
            "reply_markup": {
                "inline_keyboard": [[
                    {
                        text: question[1],
                        callback_data: `${index}_${1}`,
                    },
                    {
                        text: question[2],
                        callback_data: `${index}_${2}`,
                    },
                    {
                        text: question[3],
                        callback_data: `${index}_${3}`,
                    },
                    {
                        text: question[4],
                        callback_data: `${index}_${4}`,
                    },
                ]],

            },

        });

    } catch (error) {
        console.log(error)
    }
});


bot.on('callback_query', (query) => {
    const chatId = query.from.id
    const [index,userAnswerIndex] = query.data.split('_')
    const question = questions[index]
    if (question[userAnswerIndex]===question[5]){
        bot.sendMessage(chatId,`Верно. ${question[0]}=${question[userAnswerIndex]}`)
    }
    else{
        bot.sendMessage(chatId,`Не верно. ${question[0]}=${question[5]}, а не ${question[userAnswerIndex]}`)
    }
})


module.exports = bot