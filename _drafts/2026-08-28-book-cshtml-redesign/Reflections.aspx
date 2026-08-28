<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Reflections.aspx.cs" Inherits="Reflections" %>
<!DOCTYPE html>
<html lang="en">
<head runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>e-Faith Journey | Reflections</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Content/Site.css">
</head>
<body>
    <form id="reflectionForm" runat="server">
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
                <a class="active" href="Reflections.aspx" aria-current="page">Reflections</a>
                <a href="Confessions.aspx">Confessions</a>
                <a href="FaithInsights.aspx">Faith Insights</a>
            </nav>
        </header>

        <main>
            <section class="page-hero">
                <p class="eyebrow">Personal and group reflections</p>
                <h1>Notice what faith teaches while we learn and build.</h1>
                <p>The original group reflection now anchors this section, joined by a working ASP.NET reflection form and searchable entry list.</p>
            </section>

            <section class="content-band section-layout">
                <div class="form-panel" aria-labelledby="reflection-form-title">
                    <h2 id="reflection-form-title">Add a Reflection</h2>
                    <asp:Literal ID="ReflectionStatus" runat="server" />
                    <asp:ValidationSummary ID="ReflectionValidationSummary" runat="server" CssClass="validation-summary" HeaderText="Please fix:" />

                    <asp:Label runat="server" AssociatedControlID="ReflectionKind" Text="Reflection type" />
                    <asp:DropDownList ID="ReflectionKind" runat="server">
                        <asp:ListItem>Personal Reflection</asp:ListItem>
                        <asp:ListItem>Group Reflection</asp:ListItem>
                    </asp:DropDownList>

                    <asp:Label runat="server" AssociatedControlID="ReflectionAuthor" Text="Name or group" />
                    <asp:TextBox ID="ReflectionAuthor" runat="server" MaxLength="80" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ReflectionAuthor" ErrorMessage="Name or group is required." Display="None" />

                    <asp:Label runat="server" AssociatedControlID="ReflectionTitle" Text="Reflection title" />
                    <asp:TextBox ID="ReflectionTitle" runat="server" MaxLength="100" />
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ReflectionTitle" ErrorMessage="Reflection title is required." Display="None" />

                    <asp:Label runat="server" AssociatedControlID="ReflectionBody" Text="Reflection" />
                    <asp:TextBox ID="ReflectionBody" runat="server" TextMode="MultiLine" data-character-count="#reflection-count" data-minimum="60" />
                    <p class="field-note" id="reflection-count"></p>
                    <asp:RequiredFieldValidator runat="server" ControlToValidate="ReflectionBody" ErrorMessage="Reflection text is required." Display="None" />
                    <asp:CustomValidator runat="server" ControlToValidate="ReflectionBody" ErrorMessage="Reflection must be at least 60 characters." Display="None" OnServerValidate="ValidateReflectionLength" />

                    <asp:Label runat="server" AssociatedControlID="ReflectionScripture" Text="Scripture connection" />
                    <asp:TextBox ID="ReflectionScripture" runat="server" MaxLength="80" />

                    <div class="form-actions">
                        <asp:Button ID="SaveReflection" runat="server" Text="Save reflection" CssClass="button primary" OnClick="SaveReflection_Click" />
                    </div>
                </div>

                <div>
                    <div class="toolbar" aria-label="Reflection tools">
                        <select data-entry-filter aria-label="Filter reflections by type">
                            <option>All</option>
                            <option>Reflection</option>
                            <option>Group Reflection</option>
                        </select>
                        <input type="search" data-entry-search aria-label="Search reflections" placeholder="Search reflections">
                    </div>
                    <div class="entry-list">
                        <asp:Repeater ID="ReflectionRepeater" runat="server">
                            <ItemTemplate>
                                <article class="entry-card" data-entry-kind="<%#: Eval("Kind") %>">
                                    <p class="entry-meta"><%#: Eval("Kind") %> by <%#: Eval("Author") %> · <%# Eval("CreatedAt", "{0:MMM d, yyyy}") %></p>
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
