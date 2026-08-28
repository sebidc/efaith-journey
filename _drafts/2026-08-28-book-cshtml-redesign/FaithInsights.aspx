<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FaithInsights.aspx.cs" Inherits="FaithInsights" %>
<!DOCTYPE html>
<html lang="en">
<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>e-Faith Journey | Faith Insights</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Content/Site.css">
</head>
<body>
    <form id="insightForm" runat="server">
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
                <a href="Confessions.aspx">Confessions</a>
                <a class="active" href="FaithInsights.aspx" aria-current="page">Faith Insights</a>
            </nav>
        </header>

        <main>
            <section class="page-hero insights">
                <p class="eyebrow">Shared faith experiences</p>
                <h1>Turn reflection into prayer, wisdom, and action.</h1>
                <p>The final prayer and practical faith insights now sit together with an interactive prompt for new shared learnings.</p>
            </section>

            <section class="content-band">
                <div class="insight-grid">
                    <article class="insight-panel">
                        <h2>Final Prayer</h2>
                        <div class="prayer-box">
                            <p><em>Lord God, Creator of wisdom and source of all truth, guide our minds as we learn and build. May our work in theology and technology bring honor to Your name and service to others.</em></p>
                            <p><strong>Amen.</strong></p>
                        </div>
                    </article>
                    <article class="insight-panel">
                        <h2>Members and Roles</h2>
                        <p>Group 1 collaborators contributed through development, design, theology research, frontend work, and quality review.</p>
                    </article>
                    <article class="insight-panel">
                        <h2>Insight Prompt</h2>
                        <p>Where did this project show patience, order, humility, service, or community?</p>
                    </article>
                </div>
            </section>

            <section class="content-band muted section-layout">
                <div class="form-panel" aria-labelledby="insight-form-title">
                    <h2 id="insight-form-title">Add a Faith Insight</h2>
                    <asp:Literal ID="InsightStatus" runat="server" />
                    <asp:ValidationSummary ID="InsightValidationSummary" runat="server" CssClass="validation-summary" HeaderText="Please fix:" />

                    <asp:Label runat="server" AssociatedControlID="InsightAuthor" Text="Name or group" />
                    <asp:TextBox ID="InsightAuthor" runat="server" MaxLength="80" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="InsightAuthor" ErrorMessage="Name or group is required." Display="None" />

                    <asp:Label runat="server" AssociatedControlID="InsightTitle" Text="Insight title" />
                    <asp:TextBox ID="InsightTitle" runat="server" MaxLength="100" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="InsightTitle" ErrorMessage="Insight title is required." Display="None" />

                    <asp:Label runat="server" AssociatedControlID="InsightBody" Text="Shared faith insight" />
                    <asp:TextBox ID="InsightBody" runat="server" TextMode="MultiLine" data-character-count="#insight-count" data-minimum="50" />
                    <p class="field-note" id="insight-count"></p>
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="InsightBody" ErrorMessage="Insight text is required." Display="None" />
                    <asp:CustomValidator runat="server" ControlToValidate="InsightBody" ErrorMessage="Insight must be at least 50 characters." Display="None" OnServerValidate="ValidateInsightLength" />

                    <asp:Label runat="server" AssociatedControlID="InsightScripture" Text="Scripture connection" />
                    <asp:TextBox ID="InsightScripture" runat="server" MaxLength="80" />

                    <div class="form-actions">
                        <asp:Button ID="SaveInsight" runat="server" Text="Save insight" CssClass="button primary" OnClick="SaveInsight_Click" />
                    </div>
                </div>

                <div>
                    <div class="toolbar" aria-label="Faith insight tools">
                        <input type="search" data-entry-search aria-label="Search faith insights" placeholder="Search insights">
                    </div>
                    <div class="entry-list">
                        <asp:Repeater ID="InsightRepeater" runat="server">
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
