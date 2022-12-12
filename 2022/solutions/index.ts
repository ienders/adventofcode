import { Solution } from "../lib/solution";
import day1 from "./day1"
import day2 from "./day2"

const solutions: { (session: string): Promise<Solution> }[]  = [
    day1,
    day2
]

export default solutions
