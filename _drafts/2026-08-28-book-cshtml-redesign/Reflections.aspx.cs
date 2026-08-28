using System;
using EFaithJourney;

public partial class Reflections : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindReflections();
        }
    }

    protected void SaveReflection_Click(object sender, EventArgs e)
    {
        if (!Page.IsValid)
        {
            BindReflections();
            return;
        }

        FaithEntryRepository.AddEntry(new FaithEntry
        {
            Kind = ReflectionKind.SelectedValue == "Group Reflection" ? "Group Reflection" : "Reflection",
            Author = ReflectionAuthor.Text.Trim(),
            Title = ReflectionTitle.Text.Trim(),
            Body = ReflectionBody.Text.Trim(),
            ScriptureReference = ReflectionScripture.Text.Trim()
        });

        ReflectionAuthor.Text = string.Empty;
        ReflectionTitle.Text = string.Empty;
        ReflectionBody.Text = string.Empty;
        ReflectionScripture.Text = string.Empty;
        ReflectionStatus.Text = "<p class=\"success-message\">Reflection saved through ASP.NET and C#.</p>";
        BindReflections();
    }

    protected void ValidateReflectionLength(object source, System.Web.UI.WebControls.ServerValidateEventArgs args)
    {
        args.IsValid = args.Value.Trim().Length >= 60;
    }

    private void BindReflections()
    {
        ReflectionRepeater.DataSource = FaithEntryRepository.GetReflectionEntries();
        ReflectionRepeater.DataBind();
    }
}
