namespace Ka_veikia_seniunijos.DataTransferObjects
{
    public class DateFilter
    {
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public DateFilter() { }
        public DateFilter(string dateFrom, string dateTo)
        {
            DateFrom = dateFrom;
            DateTo = dateTo;
        }
    }
}