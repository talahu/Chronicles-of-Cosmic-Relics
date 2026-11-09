.class public Lvn/sugame/cosmicrelics/MainActivity;
.super Landroid/app/Activity;

.field public web:Landroid/webkit/WebView;

.method public constructor <init>()V
    .registers 1
    invoke-direct {p0}, Landroid/app/Activity;-><init>()V
    return-void
.end method

.method protected onCreate(Landroid/os/Bundle;)V
    .registers 6
    invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V

    invoke-virtual {p0}, Landroid/app/Activity;->getWindow()Landroid/view/Window;
    move-result-object v0
    const/16 v1, 0x80
    invoke-virtual {v0, v1}, Landroid/view/Window;->addFlags(I)V

    new-instance v0, Landroid/webkit/WebView;
    invoke-direct {v0, p0}, Landroid/webkit/WebView;-><init>(Landroid/content/Context;)V
    iput-object v0, p0, Lvn/sugame/cosmicrelics/MainActivity;->web:Landroid/webkit/WebView;

    const v1, 0xff070b1c
    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->setBackgroundColor(I)V

    invoke-virtual {v0}, Landroid/webkit/WebView;->getSettings()Landroid/webkit/WebSettings;
    move-result-object v1
    const/4 v2, 0x1
    const/4 v3, 0x0
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setJavaScriptEnabled(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setDomStorageEnabled(Z)V
    invoke-virtual {v1, v2}, Landroid/webkit/WebSettings;->setAllowFileAccess(Z)V
    invoke-virtual {v1, v3}, Landroid/webkit/WebSettings;->setMediaPlaybackRequiresUserGesture(Z)V
    invoke-virtual {v1, v3}, Landroid/webkit/WebSettings;->setSupportZoom(Z)V

    const-string v1, "file:///android_asset/index.html"
    invoke-virtual {v0, v1}, Landroid/webkit/WebView;->loadUrl(Ljava/lang/String;)V
    invoke-virtual {p0, v0}, Landroid/app/Activity;->setContentView(Landroid/view/View;)V
    return-void
.end method

.method public onBackPressed()V
    .registers 5
    iget-object v0, p0, Lvn/sugame/cosmicrelics/MainActivity;->web:Landroid/webkit/WebView;
    const-string v1, "(window.__back && window.__back()) ? 1 : 0"
    new-instance v2, Lvn/sugame/cosmicrelics/BackCallback;
    invoke-direct {v2, p0}, Lvn/sugame/cosmicrelics/BackCallback;-><init>(Lvn/sugame/cosmicrelics/MainActivity;)V
    invoke-virtual {v0, v1, v2}, Landroid/webkit/WebView;->evaluateJavascript(Ljava/lang/String;Landroid/webkit/ValueCallback;)V
    return-void
.end method

.method public reallyBack()V
    .registers 1
    invoke-super {p0}, Landroid/app/Activity;->onBackPressed()V
    return-void
.end method

.method protected onPause()V
    .registers 2
    invoke-super {p0}, Landroid/app/Activity;->onPause()V
    iget-object v0, p0, Lvn/sugame/cosmicrelics/MainActivity;->web:Landroid/webkit/WebView;
    if-eqz v0, :cond_0
    invoke-virtual {v0}, Landroid/webkit/WebView;->onPause()V
    :cond_0
    return-void
.end method

.method protected onResume()V
    .registers 2
    invoke-super {p0}, Landroid/app/Activity;->onResume()V
    iget-object v0, p0, Lvn/sugame/cosmicrelics/MainActivity;->web:Landroid/webkit/WebView;
    if-eqz v0, :cond_0
    invoke-virtual {v0}, Landroid/webkit/WebView;->onResume()V
    :cond_0
    return-void
.end method
