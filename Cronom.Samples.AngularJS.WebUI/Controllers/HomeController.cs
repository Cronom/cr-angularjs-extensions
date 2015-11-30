using System.Collections.Generic;
using System.Web.Mvc;
using Cronom.Samples.AngularJS.WebUI.Models;

namespace Cronom.Samples.AngularJS.WebUI.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PageTreeListDrop()
        {
            return View();
        }

        public JsonResult GetPageTreeListData()
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

            return Json(data, JsonRequestBehavior.AllowGet);
        }

    }
}
