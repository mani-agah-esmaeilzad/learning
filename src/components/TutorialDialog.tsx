import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle, BookOpen, ShieldQuestion, Briefcase, FileText } from "lucide-react";

export function TutorialDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-right">راهنمای استفاده از دستیار هوشمند فانوس</DialogTitle>
          <DialogDescription className="text-right">
            راهنمای کامل استفاده از قابلیت‌های پلتفرم یادگیری سازمانی فانوس
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 text-right">
          {/* بخش اول */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">دوره‌های آموزشی</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• نام دوره یا دپارتمان مورد نظر را وارد کنید (مثال: "دوره‌های آموزشی دپارتمان مالی")</p>
              <p>• از سرفصل‌های یک دوره بپرسید (مثال: "سرفصل‌های دوره مدیریت پروژه")</p>
              <p>• درباره نحوه ثبت‌نام در دوره‌ها سوال کنید.</p>
            </div>
          </div>

          {/* بخش دوم */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Briefcase className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">فرآیندهای سازمانی</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• "مراحل ثبت درخواست مرخصی چگونه است؟"</p>
              <p>• "راهنمای استفاده از سیستم اتوماسیون اداری"</p>
              <p>• "اطلاعات تماس با واحد منابع انسانی"</p>
            </div>
          </div>

          {/* بخش سوم */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldQuestion className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">پشتیبانی فنی</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• "چگونه می‌توانم رمز عبور خود را بازیابی کنم؟"</p>
              <p>• "مشکل در اتصال به شبکه شرکت"</p>
              <p>• "درخواست نصب نرم‌افزار جدید"</p>
            </div>
          </div>

          {/* بخش چهارم */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">اخبار و گزارشات</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• "آخرین اطلاعیه‌های شرکت"</p>
              <p>• "گزارش عملکرد ماهانه"</p>
              <p>• "پروژه‌های در دست اقدام کدامند؟"</p>
            </div>
          </div>

          {/* نکات مهم */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-primary">نکات مهم:</h3>
            <div className="space-y-1 text-sm">
              <p>• برای دریافت پاسخ دقیق‌تر، سوال خود را واضح بیان کنید.</p>
              <p>• می‌توانید از کلیدواژه‌های اصلی برای جستجو استفاده کنید.</p>
              <p>• این دستیار برای پاسخگویی به سوالات عمومی طراحی شده است.</p>
              <p>• برای موارد محرمانه یا پیچیده، با مدیر مستقیم خود مشورت کنید.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}