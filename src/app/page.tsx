import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Card className="bg-white/10 text-white">
            <CardHeader>
              <CardTitle>First Steps</CardTitle>
              <CardDescription>
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://create.t3.gg/en/usage/first-steps" target="_blank">
                  Learn More
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white/10 text-white">
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Learn more about Create T3 App, the libraries it uses, and how to
                deploy it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="https://create.t3.gg/en/introduction" target="_blank">
                  Explore Docs
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
