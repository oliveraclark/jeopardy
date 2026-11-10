import { BuzzerStatus, GameQuestion } from "@/types/game.types"

export interface BuzzerProps {
    question: GameQuestion | null,
    status: BuzzerStatus
}

function Buzzer({question, status}: BuzzerProps) {
    return (
        <div>
            <p>{question?.hint}</p>
            <h2>{status}</h2>
            <h1>Buzz</h1>
        </div>
    )
}
export default Buzzer