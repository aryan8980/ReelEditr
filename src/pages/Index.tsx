import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wand2, 
  Music, 
  Video, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Play,
  TrendingUp,
  Hash
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Music className="w-6 h-6" />,
      title: "Audio Beat Detection",
      description: "Upload your audio and tap to mark beat points with precision"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Smart Video Trimming",
      description: "Automatically trim video clips at your marked beat points"
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "AI-Powered Merging",
      description: "Seamlessly merge video clips with your audio track"
    },
    {
      icon: <Hash className="w-6 h-6" />,
      title: "Trending Hashtags",
      description: "Get trending hashtags by category to boost your reach"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Header */}
          <div className="animate-slide-down">
            <Badge 
              variant="outline" 
              className="mb-4 px-4 py-1 bg-primary/10 text-primary border-primary/20"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Aryan-Powered Video Editing
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Create Viral Reels
              <br />
              <span className="text-foreground">Beat by Beat</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Upload your audio, mark the beats, and let ReelEditr automatically create perfectly synced video content that goes viral.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-bounce">
            <Button 
              size="lg"
              className="btn-creative bg-gradient-primary hover:shadow-glow text-lg px-8 py-6"
              onClick={() => window.location.href = "/auth"}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="glass-card text-lg px-8 py-6"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              See Examples
            </Button>
          </div>

          {/* Feature Preview */}
          <div className="relative animate-float">
            <div className="glass-card p-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Upload Audio</h3>
                    <p className="text-sm text-muted-foreground">Any format supported</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-secondary/20">
                    <Zap className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Mark Beats</h3>
                    <p className="text-sm text-muted-foreground">Tap to sync perfectly</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-accent/20">
                    <Video className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Export Reel</h3>
                    <p className="text-sm text-muted-foreground">Ready for social media</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Create
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional video editing tools designed for creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card hover:shadow-float transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-primary/20 group-hover:bg-gradient-primary/30 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card bg-gradient-card">
            <CardContent className="p-12">
              <div className="animate-glow-pulse">
                <Wand2 className="w-16 h-16 text-primary mx-auto mb-6" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Your First Reel?
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of creators using ReelEditr to make viral content
              </p>
              
              <Button 
                size="lg"
                className="btn-creative bg-gradient-primary hover:shadow-glow text-lg px-8 py-6"
                onClick={() => window.location.href = "/auth"}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 ReelEditr. Made by Aryan for creators.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
