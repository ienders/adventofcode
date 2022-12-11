import { exit } from "process"

export const getDay = (): number => {
    try {
        const day = parseInt(process.argv[2])
        if (day >= 1 && day <= 25) return day
    } catch (err) { /* empty */ }
    console.log('Please enter a valid day between 1 and 25 as first argument to program.')
    exit(1)
}
