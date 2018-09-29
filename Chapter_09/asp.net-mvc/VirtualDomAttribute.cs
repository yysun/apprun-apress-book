using HtmlAgilityPack;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication2
{
    public class VirtualDomAttribute : FilterAttribute, IResultFilter
    {
        StringWriter textWriter;
        TextWriter originalWriter;
        bool isSSR;

        public VirtualDomAttribute()
        {

        }

        public void OnResultExecuting(ResultExecutingContext filterContext)
        {
            var accept = filterContext.HttpContext.Request.Headers["accept"];
            this.isSSR = accept.IndexOf("application/json") < 0;
            originalWriter = filterContext.HttpContext.Response.Output;
            textWriter = new StringWriter(CultureInfo.InvariantCulture);
            filterContext.HttpContext.Response.Output = textWriter;
        }

        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            var capturedText = textWriter.ToString();
            var vdom = capturedText;
            if (!this.isSSR)
            {
                var doc = new HtmlDocument();
                doc.LoadHtml(capturedText);
                var root = doc.DocumentNode.SelectSingleNode("//div[@id='apprun-app']");
                if (root == null) root = doc.DocumentNode.SelectSingleNode("/div");
                vdom = RemoveWhiteSpace(Convert(root).GetValue("children").ToString(Formatting.None));
            }
            filterContext.HttpContext.Response.Output = originalWriter;
            filterContext.HttpContext.Response.Write(vdom);
        }

        string RemoveWhiteSpace(string s)
        {
            return s.Replace("\\r", "").Replace("\\n", "").Trim();
        }

        public JObject Convert(HtmlNode documentNode)
        {
            if (documentNode.Name == "#comment") return null;
            if (documentNode.Name == "#document") documentNode.Name = "div";
            var children = new JArray();
            foreach (var child in documentNode.ChildNodes)
            {
                if (child.Name == "#text")
                {
                    if (RemoveWhiteSpace(child.InnerText).Length > 0)
                    {
                        children.Add(new JValue(HtmlEntity.DeEntitize(child.InnerText)));
                    }
                }
                else
                {
                    var ch = Convert(child);
                    if (ch != null) children.Add(ch);
                }
            }
            var vdom = JObject.FromObject(new
            {
                tag = documentNode.Name,
                children = children
            });
            var props = JObject.FromObject(new {});
            documentNode.Attributes.ToList().ForEach(attr =>
            {
                var name = attr.Name;
                if (name == "class") name = "className";
                props.Add(name, attr.Value);
            });
            if(props.HasValues) vdom.Add("props", props);
            return vdom;
        }
    }

}