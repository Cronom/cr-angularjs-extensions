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

        public ActionResult PageAutocomplete()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetPageAutocompleteData()
        {
            var data = SampleData.CountriesAsList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult QueryPageAutocompleteData(string keyword)
        {
            var data = SampleData.CountriesAsList().FindAll(c => c.Title.ToLowerInvariant().Contains(keyword.ToLowerInvariant()));
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult QueryFavoredTextEditor(string keyword)
        {
            var data = SampleData.TextEditorsAsList().FindAll(c => c.Title.ToLowerInvariant().Contains(keyword.ToLowerInvariant()));
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PageForm()
        {
            return View();
        }
    }
}
