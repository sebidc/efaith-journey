using System;
using EFaithJourney;

public partial class FaithInsights : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindInsights();
        }
    }

    protected void SaveInsight_Click(object sender, EventArgs e)
    {
        if (!Page.IsValid)
        {
            BindInsights();
            return;
        }

        FaithEntryRepository.AddEntry(new FaithEntry
        {
            Kind = "Faith Insight",
            Author = InsightAuthor.Text.Trim(),
            Title = InsightTitle.Text.Trim(),
            Body = InsightBody.Text.Trim(),
            ScriptureReference = InsightScripture.Text.Trim()
        });

        InsightAuthor.Text = string.Empty;
        InsightTitle.Text = string.Empty;
        InsightBody.Text = string.Empty;
        InsightScripture.Text = string.Empty;
        InsightStatus.Text = "<p class=\"success-message\">Faith insight saved through ASP.NET and C#.</p>";
        BindInsights();
    }

    protected void ValidateInsightLength(object source, System.Web.UI.WebControls.ServerValidateEventArgs args)
    {
        args.IsValid = args.Value.Trim().Length >= 50;
    }

    private void BindInsights()
    {
        InsightRepeater.DataSource = FaithEntryRepository.GetEntries("Faith Insight");
        InsightRepeater.DataBind();
    }
}
