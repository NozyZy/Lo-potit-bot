import {ICommand} from "wokcommands";
import {Constants, MessageEmbed} from "discord.js";
import {utils} from "../Utils/utils";
import logger from "../Utils/logger";

export default {
    category: 'Useful',
    description: 'Qui a la plus gorsse ? ( ͡° ͜ʖ ͡°)',
    slash: true,
    options: [
        {
            name: 'who',
            description: 'Ton pote en a-t-il une plus grosse ?',
            required: false,
            type: Constants.ApplicationCommandOptionTypes.USER,
        },
    ],

    callback: ({ interaction})=> {
        let user = interaction.user;
        let ctx = interaction;
        if (ctx.options.getUser('who')) {
            user = ctx.options.getUser('who');
        }

        let bite = "8";
        const val = value(user.id, utils.day, utils.month)
        for (let i = 0; i < val; i++) {
            bite += "=";
        }

        bite += "D";

        logger.info(user.username + " a une bite de " + val)
        return new MessageEmbed()
            .setTitle(bite)
            .setDescription(utils.tag(user))
    }
} as ICommand

function value(a, b: number  , c: number): number {
    return (Number(a)/100) % ((b + c) % 13 + (11*Math.pow(b, c)) % 20)
}
