<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Confessions.aspx.cs" Inherits="Confessions" %>
<!DOCTYPE html>
<html lang="en">
<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>e-Faith Journey | Confessions</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Content/Site.css">
</head>
<body>
    <form id="confessionForm" runat="server">
        <header class="site-header">
            <a class="brand" href="index.html" aria-label="e-Faith Journey home">
                <span class="brand-mark" aria-hidden="true">EF</span>
                <span><strong>e-Faith Journey</strong><small>Theology Reflection Platform</small></span>
            </a>
            <button class="nav-toggle" type="button" aria-controls="primary-navigation" aria-expanded="false">
                <span class="sr-only">Open navigation</span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
            </button>
            <nav class="primary-nav" id="primary-navigation" aria-label="Primary navigation">
                <a href="index.html">Home</a>
                <a href="Reflections.aspx">Reflections</a>
                <a class="active" href="Confessions.aspx" aria-current="page">Confessions</a>
                <a href="FaithInsights.aspx">Faith Insights</a>
            </nav>
        </header>

        <main>
            <section class="page-hero confessions">
                <p class="eyebrow">Confessional and testimonial content</p>
                <h1>Share where truth, humility, and growth meet.</h1>
                <p>The original individual confessions now become a focused testimonial section with live preview and server-side saving.</p>
            </section>

            <section class="content-band section-layout">
                <div class="form-panel" aria-labelledby="confession-form-title">
                    <h2 id="confession-form-title">Submit a Confession</h2>
                    <asp:Literal ID="ConfessionStatus" runat="server" />
                    <asp:ValidationSummary ID="ConfessionValidationSummary" runat="server" CssClass="validation-summary" HeaderText="Please fix:" />

                    <asp:Label runat="server" AssociatedControlID="ConfessionAuthor" Text="Name" />
                    <asp:TextBox ID="ConfessionAuthor" runat="server" MaxLength="80" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ConfessionAuthor" ErrorMessage="Name is required." Display="None" />

                    <asp:Label runat="server" AssociatedControlID="ConfessionTitle" Text="Testimony title" />
                    <asp:TextBox ID="ConfessionTitle" runat="server" MaxLength="100" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ConfessionTitle" ErrorMessage="Title is required." Display="None" />

                    <asp:Label runat="server" AssociatedControlID="ConfessionBody" Text="Confession or testimony" />
                    <asp:TextBox ID="ConfessionBody" runat="server" TextMode="MultiLine" data-confession-text="" data-character-count="#confession-count" data-minimum="80" />
                    <p class="field-note" id="confession-count"></p>
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ConfessionBody" ErrorMessage="Confession text is required." Display="None" />
                    <asp:CustomValidator runat="server" ControlToValidate="ConfessionBody" ErrorMessage="Confession must be at least 80 characters." Display="None" OnServerValidate="ValidateConfessionLength" />

                    <asp:Label runat="server" AssociatedControlID="ConfessionScripture" Text="Scripture connection" />
                    <asp:TextBox ID="ConfessionScripture" runat="server" MaxLength="80" />

                    <div class="preview-box" data-confession-preview>Your testimonial preview will appear here as you type.</div>

                    <div class="form-actions">
                        <asp:Button ID="SaveConfession" runat="server" Text="Save confession" CssClass="button primary" OnClick="SaveConfession_Click" />
                    </div>
                </div>

                <div>
                    <div class="toolbar" aria-label="Confession tools">
                        <input type="search" data-entry-search aria-label="Search confessions" placeholder="Search confessions">
                    </div>
                    <div class="entry-list">
                        <asp:Repeater ID="ConfessionRepeater" runat="server">
                            <ItemTemplate>
                                <article class="entry-card" data-entry-kind="<%#: Eval("Kind") %>">
                                    <p class="entry-meta"><%#: Eval("Author") %> · <%# Eval("CreatedAt", "{0:MMM d, yyyy}") %></p>
                                    <h3><%#: Eval("Title") %></h3>
                                    <p><%#: Eval("Body") %></p>
                                    <blockquote><%#: Eval("ScriptureReference") %></blockquote>
                                </article>
                            </ItemTemplate>
                        </asp:Repeater>
                    </div>
                </div>
            </section>
        </main>

        <footer class="site-footer"><p>Theology and Computer Programming Collaborative Project — Group 1</p></footer>
    </form>
    <script src="Scripts/site.js"></script>
</body>
</html>
