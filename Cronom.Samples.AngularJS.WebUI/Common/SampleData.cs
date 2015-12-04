using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using Cronom.Samples.AngularJS.WebUI.Models;

namespace Cronom.Samples.AngularJS.WebUI.Common
{
    public class SampleData
    {
        public static List<TreeListItemModel> CountriesAsTreeList()
        {
            var data = new List<TreeListItemModel>();
            data.Add(new TreeListItemModel
            {
                Id = "EU",
                Title = "Europe",
                Children = new List<TreeListItemModel>
                {
                    new TreeListItemModel {Id = "UK", Title = "United Kingdom"},
                    new TreeListItemModel {Id = "DE", Title = "Germany"},
                    new TreeListItemModel {Id = "FR", Title = "France"},
                    new TreeListItemModel {Id = "NR", Title = "Norway"},
                    new TreeListItemModel {Id = "AU", Title = "Austria"},
                    new TreeListItemModel {Id = "SW", Title = "Switzerland"},
                    new TreeListItemModel {Id = "UR", Title = "Ukraine"},
                    new TreeListItemModel {Id = "PL", Title = "Polonia"},
                    new TreeListItemModel {Id = "GR", Title = "Greece"},
                    new TreeListItemModel {Id = "TR", Title = "Turkey"},
                }
            });

            data.Add(new TreeListItemModel
            {
                Id = "AS",
                Title = "Asia",
                Children = new List<TreeListItemModel>
                {
                    new TreeListItemModel {Id = "JP", Title = "Japan"},
                    new TreeListItemModel {Id = "CH", Title = "China"},
                    new TreeListItemModel {Id = "KR", Title = "Korea"},
                    new TreeListItemModel {Id = "RU", Title = "Russia"},
                    new TreeListItemModel {Id = "IR", Title = "Iraq"},
                    new TreeListItemModel {Id = "SY", Title = "Syria"},
                    new TreeListItemModel {Id = "NP", Title = "Nepal"},
                    new TreeListItemModel {Id = "LA", Title = "Laos"},
                    new TreeListItemModel {Id = "UA", Title = "United Arab Emirates"},
                }
            });

            data.Add(new TreeListItemModel
            {
                Id = "AF",
                Title = "Africa",
                Children = new List<TreeListItemModel>
                {
                    new TreeListItemModel {Id = "NG", Title = "Nigeria"},
                    new TreeListItemModel {Id = "EG", Title = "Egypt"},
                    new TreeListItemModel {Id = "EH", Title = "Ethiopia"},
                    new TreeListItemModel {Id = "CG", Title = "Congo (D.R)"},
                    new TreeListItemModel {Id = "AL", Title = "Algeria"},
                    new TreeListItemModel {Id = "AG", Title = "Angola"},
                    new TreeListItemModel {Id = "CM", Title = "Cameroon"},
                    new TreeListItemModel {Id = "GH", Title = "Ghana"},
                    new TreeListItemModel {Id = "KY", Title = "Kenya"},
                }
            });


            return data;
        }

        public static List<ListItemModel> CountriesAsList()
        {
            var list = new List<ListItemModel>();
            var tree = CountriesAsTreeList();
            foreach (var parent in tree)
            {
                list.AddRange(parent.Children.Select(c => new ListItemModel { Id = c.Id, Title = c.Title }));
            }
            return list;
        }

        public static List<TreeListItemModel> RandomTreeList()
        {
            var data = new List<TreeListItemModel>();
            for (var top = 0; top < 3; top++)
            {
                data.Add(new TreeListItemModel
                {
                    Id = "TopLevel_" + (top + 1),
                    Title = "Top Level Item " + (top + 1)
                });
            }

            foreach (var item in data)
            {
                for (var med = 0; med < 4; med++)
                {
                    item.Children.Add(new TreeListItemModel
                    {
                        Id = "MediumLevel_" + (med + 1),
                        Title = "Medium Level Item " + (med + 1),
                    });
                }

                foreach (var medium in item.Children)
                {
                    for (var child = 0; child < 5; child++)
                    {
                        medium.Children.Add(new TreeListItemModel
                        {
                            Id = "SubLevel_" + (child + 1),
                            Title = "Sub Level Item " + (child + 1),
                        });
                    }
                }
            }
            return data;
        }

        public static List<ListItemModel> TextEditorsAsList()
        {
            var list = new List<ListItemModel>
            {
                new ListItemModel{Id = "1",Title = "Notepad++"},
                new ListItemModel{Id = "2",Title = "Notepad"},
                new ListItemModel{Id = "3",Title = "Atom"},
                new ListItemModel{Id = "4",Title = "Emacs"},
                new ListItemModel{Id = "5",Title = "Vi"},
                new ListItemModel{Id = "6",Title = "Vim"},
                new ListItemModel{Id = "7",Title = "Sublime"},
                new ListItemModel{Id = "8",Title = "KEdit"},
            };

            return list;
        }
    }
}