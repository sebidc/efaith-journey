using System;
using EFaithJourney;

public partial class Confessions : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindConfessions();
        }
    }

    protected void SaveConfession_Click(object sender, EventArgs e)
    {
        if (!Page.IsValid)
        {
            BindConfessions();
            return;
        }

        FaithEntryRepository.AddEntry(new FaithEntry
        {
            Kind = "Confession",
            Author = ConfessionAuthor.Text.Trim(),
            Title = ConfessionTitle.Text.Trim(),
            Body = ConfessionBody.Text.Trim(),
            ScriptureReference = ConfessionScripture.Text.Trim()
        });

        ConfessionAuthor.Text = string.Empty;
        ConfessionTitle.Text = string.Empty;
        ConfessionBody.Text = string.Empty;
        ConfessionScripture.Text = string.Empty;
        ConfessionStatus.Text = "<p class=\"success-message\">Confession saved through ASP.NET and C#.</p>";
        BindConfessions();
    }

    protected void ValidateConfessionLength(object source, System.Web.UI.WebControls.ServerValidateEventArgs args)
    {
        args.IsValid = args.Value.Trim().Length >= 80;
    }

    private void BindConfessions()
    {
        ConfessionRepeater.DataSource = FaithEntryRepository.GetEntries("Confession");
        ConfessionRepeater.DataBind();
    }
}
