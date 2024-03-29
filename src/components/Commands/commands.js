/* eslint-disable import/no-anonymous-default-export */
import getcat from "../../utils/cat"
import getnp from "../../utils/spotify"
export default {
    commands: {
        echo: {
            description: 'Prints the given text to the console',
            usage: 'echo <text>',
            fn: (...args) => args.join(" ")
        },
        // cat: {
        //     description: 'Get a cute cat image.',
        //     usage: 'cat',
        //     fn: async () => {
        //         const url = await getcat()
        //         window.open(url, '_blank')
        //         return "fetching cat...\ncat fetched successfully!"
        //     }
        // },
    },
    overwrites: {
            help: {
                description: 'List all available commands',
                usage: 'help',
            },
            cd: {
                description: 'Change directory, not really, lol!',
                usage: 'cd <directory>',
            },
            ls: {
                description: 'List files in the current directory',
                usage: 'ls',
            },
            mkdir: {
                description: 'Make a directory',
                usage: 'mkdir <directory>',
            },
            clear: {
                description: 'Clears the terminal',
                usage: 'clear'
            },
            cat: {
                description: 'Get a cute cat image.',
                usage: 'cat',
            },
            usb: {
                description: 'Connect Usb to terminal',
                usage: 'usb',
            },
            exit:{
                description:'Leave the terminal ',
                usage: 'exit',
            }
        }

}