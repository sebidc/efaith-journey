using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace EFaithJourney
{
    public static class FaithEntryRepository
    {
        private static readonly object FileLock = new object();

        public static IList<FaithEntry> GetEntries(string kind)
        {
            return ReadEntries()
                .Where(entry => string.Equals(entry.Kind, kind, StringComparison.OrdinalIgnoreCase))
                .OrderByDescending(entry => entry.CreatedAt)
                .ToList();
        }

        public static IList<FaithEntry> GetReflectionEntries()
        {
            return ReadEntries()
                .Where(entry => entry.Kind == "Reflection" || entry.Kind == "Group Reflection")
                .OrderByDescending(entry => entry.CreatedAt)
                .ToList();
        }

        public static void AddEntry(FaithEntry entry)
        {
            entry.Id = Guid.NewGuid();
            entry.CreatedAt = DateTime.UtcNow;

            lock (FileLock)
            {
                var entries = ReadEntries();
                entries.Add(entry);
                WriteEntries(entries);
            }
        }

        private static List<FaithEntry> ReadEntries()
        {
            var path = GetDataPath();

            if (!File.Exists(path))
            {
                return SeedEntries();
            }

            var json = File.ReadAllText(path);
            if (string.IsNullOrWhiteSpace(json))
            {
                return SeedEntries();
            }

            return new JavaScriptSerializer().Deserialize<List<FaithEntry>>(json) ?? new List<FaithEntry>();
        }

        private static void WriteEntries(IList<FaithEntry> entries)
        {
            var path = GetDataPath();
            Directory.CreateDirectory(Path.GetDirectoryName(path));
            var json = new JavaScriptSerializer().Serialize(entries);
            File.WriteAllText(path, json);
        }

        private static string GetDataPath()
        {
            var context = HttpContext.Current;
            if (context != null)
            {
                return context.Server.MapPath("~/App_Data/faith-entries.json");
            }

            return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "App_Data", "faith-entries.json");
        }

        private static List<FaithEntry> SeedEntries()
        {
            return new List<FaithEntry>
            {
                new FaithEntry
                {
                    Id = Guid.NewGuid(),
                    Kind = "Group Reflection",
                    Author = "Group 1",
                    Title = "Building with Care",
                    Body = "Working together taught us that constructing software is much like building a faith community: every line of code requires care, intent, and structural integrity.",
                    ScriptureReference = "1 Corinthians 12:12",
                    CreatedAt = DateTime.UtcNow.AddDays(-4)
                },
                new FaithEntry
                {
                    Id = Guid.NewGuid(),
                    Kind = "Confession",
                    Author = "Student Contributor",
                    Title = "Faith and Logic",
                    Body = "Faith and logic are not opposing forces, but two sides of the same divine truth. This project helped me see programming as a practice of patience and responsibility.",
                    ScriptureReference = "Proverbs 2:6",
                    CreatedAt = DateTime.UtcNow.AddDays(-3)
                },
                new FaithEntry
                {
                    Id = Guid.NewGuid(),
                    Kind = "Faith Insight",
                    Author = "Group 1",
                    Title = "Learning as Service",
                    Body = "Technology becomes meaningful when it is shaped by truth, humility, and service to others.",
                    ScriptureReference = "Colossians 3:23",
                    CreatedAt = DateTime.UtcNow.AddDays(-2)
                }
            };
        }
    }
}
