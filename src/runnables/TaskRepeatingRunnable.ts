abstract class TaskRepeatingRunnable {
    constructor(startDelay: number, timeout: number) {
        if (startDelay > 0) {
            setTimeout(() => {
                this.run();
                setInterval(() => {
                    this.run();
                }, timeout);
            }, startDelay);
        } else {
            this.run();
            setInterval(() => {
                this.run();
            }, timeout);
        }
    }

    public abstract run(): Promise<void>;
}

export default TaskRepeatingRunnable;
