using System.Collections.Generic;
using System.Web.Mvc;
using Cronom.Samples.AngularJS.WebUI.Common;
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
            var data = SampleData.CountriesAsTreeList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

    }
}
