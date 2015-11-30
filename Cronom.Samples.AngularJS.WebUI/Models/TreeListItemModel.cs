using System.Collections.Generic;

namespace Cronom.Samples.AngularJS.WebUI.Models
{
    public class TreeListItemModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public List<TreeListItemModel> Children { get; set; }

        public TreeListItemModel()
        {
            Children = new List<TreeListItemModel>();
        }
    }
}