import { Solution } from "../lib/solution";
import day1 from "./day1"
import day2 from "./day2"
import day3 from "./day3"

const solutions: { (session: string): Promise<Solution> }[]  = [
    day1,
    day2,
    day3,
]

export default solutions
