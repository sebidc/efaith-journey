using System;

namespace EFaithJourney
{
    public class FaithEntry
    {
        public Guid Id { get; set; }
        public string Kind { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string ScriptureReference { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
