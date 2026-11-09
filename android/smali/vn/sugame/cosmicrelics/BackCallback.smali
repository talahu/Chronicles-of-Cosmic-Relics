.class public Lvn/sugame/cosmicrelics/BackCallback;
.super Ljava/lang/Object;
.implements Landroid/webkit/ValueCallback;

.field private final act:Lvn/sugame/cosmicrelics/MainActivity;

.method public constructor <init>(Lvn/sugame/cosmicrelics/MainActivity;)V
    .registers 2
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V
    iput-object p1, p0, Lvn/sugame/cosmicrelics/BackCallback;->act:Lvn/sugame/cosmicrelics/MainActivity;
    return-void
.end method

.method public onReceiveValue(Ljava/lang/Object;)V
    .registers 4
    const-string v0, "1"
    invoke-virtual {v0, p1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-nez v0, :cond_0
    iget-object v1, p0, Lvn/sugame/cosmicrelics/BackCallback;->act:Lvn/sugame/cosmicrelics/MainActivity;
    invoke-virtual {v1}, Lvn/sugame/cosmicrelics/MainActivity;->reallyBack()V
    :cond_0
    return-void
.end method
