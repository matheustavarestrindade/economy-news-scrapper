class MilliTime {
    public static readonly SECOND = 1000;
    public static readonly MINUTE = 60 * MilliTime.SECOND;
    public static readonly HOUR = 60 * MilliTime.MINUTE;
    public static readonly DAY = 24 * MilliTime.HOUR;
    public static readonly WEEK = 7 * MilliTime.DAY;
    public static readonly MONTH = 30 * MilliTime.DAY;
    public static readonly YEAR = 365 * MilliTime.DAY;
}

export default MilliTime;
