
import { Heart, HeartHandshake } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const HelpCard = () => {
  return (
    <div>
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" /> Need Help?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-5">
          <p className="text-sm text-gray-600 mb-2">
            Have questions about your wedding booking? Our specialists are here to assist you with any inquiries.
          </p>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <HeartHandshake className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Wedding Support Team</p>
                <p className="text-xs text-muted-foreground">Available Mon-Fri, 9AM-6PM</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-1 pb-6">
          <Link
            className="w-full border-gray-300"
            href="/contact"
          >
            Contact Support
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default HelpCard
