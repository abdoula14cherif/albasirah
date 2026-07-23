from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Header
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from supabase import create_client, Client
from typing import Optional, List
import uuid, os

# Répertoire public (relatif à ce fichier)
PUBLIC = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public")

# ─── CONFIG ────────────────────────────────────────────────────
SUPABASE_URL = "https://mutdtyifvcrkiouudwhr.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11dGR0eWlmdmNya2lvdXVkd2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5ODEwODcsImV4cCI6MjA4OTU1NzA4N30.l08pEalpQ50QN4xVuDp5hyan7hwXprHOeCo0nrCA4vU"

sb: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI(title="Al Basirah API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── HELPERS ───────────────────────────────────────────────────
def ok(data):
    return JSONResponse({"success": True, "data": data})

def err(msg: str, code: int = 400):
    return JSONResponse({"success": False, "error": msg}, status_code=code)

async def check_admin(authorization: Optional[str] = None) -> bool:
    """Verify user is admin via Supabase JWT"""
    if not authorization or not authorization.startswith("Bearer "):
        return False
    token = authorization.replace("Bearer ", "")
    try:
        user = sb.auth.get_user(token)
        if not user or not user.user:
            return False
        res = sb.table("profiles").select("is_admin").eq("id", user.user.id).single().execute()
        return res.data and res.data.get("is_admin", False)
    except Exception:
        return False

# ─── PAGES HTML ────────────────────────────────────────────────
@app.get("/")
@app.get("/index.html")
def serve_index():
    return FileResponse(os.path.join(PUBLIC, "index.html"), media_type="text/html")

@app.get("/admin.html")
def serve_admin():
    return FileResponse(os.path.join(PUBLIC, "admin.html"), media_type="text/html")

# ─── ROOT API ───────────────────────────────────────────────────
@app.get("/api")
def root():
    return {"message": "Al Basirah API v1.0", "status": "ok"}

# ─── SCHOLARS ──────────────────────────────────────────────────
@app.get("/api/scholars")
def get_scholars(category: Optional[str] = None, q: Optional[str] = None):
    try:
        query = sb.table("scholars").select("*").order("name_fr")
        if category:
            query = query.eq("category", category)
        res = query.execute()
        data = res.data or []
        if q:
            q_low = q.lower()
            data = [s for s in data if
                    q_low in (s.get("name_fr") or "").lower() or
                    q in (s.get("name_ar") or "")]
        return ok(data)
    except Exception as e:
        return err(str(e))

@app.get("/api/scholars/{scholar_id}")
def get_scholar(scholar_id: str):
    try:
        res = sb.table("scholars").select("*").eq("id", scholar_id).single().execute()
        if not res.data:
            return err("Savant non trouve", 404)
        scholar = res.data
        # Get content counts
        books = sb.table("books").select("id", count="exact").eq("scholar_id", scholar_id).execute()
        audios = sb.table("audios").select("id", count="exact").eq("scholar_id", scholar_id).execute()
        videos = sb.table("videos").select("id", count="exact").eq("scholar_id", scholar_id).execute()
        scholar["books_count"] = books.count or 0
        scholar["audios_count"] = audios.count or 0
        scholar["videos_count"] = videos.count or 0
        return ok(scholar)
    except Exception as e:
        return err(str(e))

@app.post("/api/scholars")
async def create_scholar(
    name_ar: str = Form(...),
    name_fr: str = Form(...),
    initial: str = Form(...),
    country: Optional[str] = Form(None),
    era: Optional[str] = Form(None),
    category: str = Form("contemporain"),
    tags: Optional[str] = Form(None),
    bio: Optional[str] = Form(None),
    photo: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        avatar_url = None
        if photo and photo.filename:
            content = await photo.read()
            ext = photo.filename.split(".")[-1].lower()
            path = f"scholars/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": photo.content_type})
            avatar_url = sb.storage.from_("covers").get_public_url(path)

        slug = name_fr.lower()
        for ch in " àâäéèêëîïôùûüç":
            slug = slug.replace(ch, "-")
        scholar_id = slug[:30] + "-" + uuid.uuid4().hex[:6]

        tags_list = [t.strip() for t in tags.split(",")] if tags else []

        data = {
            "id": scholar_id,
            "name_ar": name_ar,
            "name_fr": name_fr,
            "initial": initial[:2],
            "country": country,
            "era": era,
            "category": category,
            "tags": tags_list,
            "bio": bio,
            "avatar_url": avatar_url,
        }
        res = sb.table("scholars").insert(data).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.put("/api/scholars/{scholar_id}")
async def update_scholar(
    scholar_id: str,
    name_ar: Optional[str] = Form(None),
    name_fr: Optional[str] = Form(None),
    initial: Optional[str] = Form(None),
    country: Optional[str] = Form(None),
    era: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),
    bio: Optional[str] = Form(None),
    is_live: Optional[str] = Form(None),
    live_title: Optional[str] = Form(None),
    live_url: Optional[str] = Form(None),
    photo: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        data = {}
        if name_ar: data["name_ar"] = name_ar
        if name_fr: data["name_fr"] = name_fr
        if initial: data["initial"] = initial[:2]
        if country is not None: data["country"] = country
        if era is not None: data["era"] = era
        if category: data["category"] = category
        if tags is not None: data["tags"] = [t.strip() for t in tags.split(",") if t.strip()]
        if bio is not None: data["bio"] = bio
        if is_live is not None: data["is_live"] = is_live == "true"
        if live_title is not None: data["live_title"] = live_title
        if live_url is not None: data["live_url"] = live_url

        if photo and photo.filename:
            content = await photo.read()
            ext = photo.filename.split(".")[-1].lower()
            path = f"scholars/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": photo.content_type})
            data["avatar_url"] = sb.storage.from_("covers").get_public_url(path)

        res = sb.table("scholars").update(data).eq("id", scholar_id).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.delete("/api/scholars/{scholar_id}")
async def delete_scholar(scholar_id: str, authorization: Optional[str] = Header(None)):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        sb.table("scholars").delete().eq("id", scholar_id).execute()
        return ok({"deleted": scholar_id})
    except Exception as e:
        return err(str(e))

# ─── BOOKS ─────────────────────────────────────────────────────
@app.get("/api/books")
def get_books(scholar_id: Optional[str] = None, category: Optional[str] = None, q: Optional[str] = None):
    try:
        query = sb.table("books").select("*").order("created_at", desc=True)
        if scholar_id: query = query.eq("scholar_id", scholar_id)
        if category:   query = query.eq("category", category)
        res = query.execute()
        data = res.data or []
        if q:
            q_low = q.lower()
            data = [b for b in data if q_low in (b.get("title") or "").lower()]
        return ok(data)
    except Exception as e:
        return err(str(e))

@app.get("/api/books/{book_id}")
def get_book(book_id: int):
    try:
        res = sb.table("books").select("*").eq("id", book_id).single().execute()
        if not res.data: return err("Livre non trouve", 404)
        return ok(res.data)
    except Exception as e:
        return err(str(e))

@app.post("/api/books")
async def create_book(
    title: str = Form(...),
    author_name: Optional[str] = Form(None),
    scholar_id: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    file_type: str = Form("PDF"),
    pages: Optional[int] = Form(None),
    file_url: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    is_new: Optional[str] = Form("false"),
    file: Optional[UploadFile] = File(None),
    cover: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        final_url = file_url
        if file and file.filename and not file_url:
            content = await file.read()
            ext = file.filename.split(".")[-1].lower()
            path = f"books/{uuid.uuid4()}.{ext}"
            sb.storage.from_("books").upload(path, content, {"content-type": file.content_type})
            final_url = sb.storage.from_("books").get_public_url(path)

        cover_url = None
        if cover and cover.filename:
            content = await cover.read()
            ext = cover.filename.split(".")[-1].lower()
            path = f"covers/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": cover.content_type})
            cover_url = sb.storage.from_("covers").get_public_url(path)

        data = {
            "title": title,
            "author_name": author_name,
            "scholar_id": scholar_id or None,
            "category": category,
            "file_type": file_type,
            "pages": pages or 0,
            "file_url": final_url,
            "cover_url": cover_url,
            "description": description,
            "is_new": is_new == "true",
            "downloads": 0,
            "views": 0,
        }
        res = sb.table("books").insert(data).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.put("/api/books/{book_id}")
async def update_book(
    book_id: int,
    title: Optional[str] = Form(None),
    author_name: Optional[str] = Form(None),
    scholar_id: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    file_type: Optional[str] = Form(None),
    pages: Optional[int] = Form(None),
    file_url: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    is_new: Optional[str] = Form(None),
    cover: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        data = {}
        if title: data["title"] = title
        if author_name is not None: data["author_name"] = author_name
        if scholar_id is not None: data["scholar_id"] = scholar_id or None
        if category is not None: data["category"] = category
        if file_type: data["file_type"] = file_type
        if pages is not None: data["pages"] = pages
        if file_url is not None: data["file_url"] = file_url
        if description is not None: data["description"] = description
        if is_new is not None: data["is_new"] = is_new == "true"

        if cover and cover.filename:
            content = await cover.read()
            ext = cover.filename.split(".")[-1].lower()
            path = f"covers/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": cover.content_type})
            data["cover_url"] = sb.storage.from_("covers").get_public_url(path)

        res = sb.table("books").update(data).eq("id", book_id).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.delete("/api/books/{book_id}")
async def delete_book(book_id: int, authorization: Optional[str] = Header(None)):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        sb.table("books").delete().eq("id", book_id).execute()
        return ok({"deleted": book_id})
    except Exception as e:
        return err(str(e))

# ─── AUDIOS ────────────────────────────────────────────────────
@app.get("/api/audios")
def get_audios(scholar_id: Optional[str] = None, category: Optional[str] = None, q: Optional[str] = None):
    try:
        query = sb.table("audios").select("*").order("created_at", desc=True)
        if scholar_id: query = query.eq("scholar_id", scholar_id)
        if category:   query = query.eq("category", category)
        res = query.execute()
        data = res.data or []
        if q:
            q_low = q.lower()
            data = [a for a in data if q_low in (a.get("title") or "").lower()]
        return ok(data)
    except Exception as e:
        return err(str(e))

@app.post("/api/audios")
async def create_audio(
    title: str = Form(...),
    scholar_id: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    episodes: Optional[int] = Form(1),
    duration: Optional[str] = Form(None),
    file_url: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    audio_file: Optional[UploadFile] = File(None),
    cover: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        final_url = file_url
        if audio_file and audio_file.filename and not file_url:
            content = await audio_file.read()
            ext = audio_file.filename.split(".")[-1].lower()
            path = f"audio/{uuid.uuid4()}.{ext}"
            sb.storage.from_("audio").upload(path, content, {"content-type": audio_file.content_type})
            final_url = sb.storage.from_("audio").get_public_url(path)

        cover_url = None
        if cover and cover.filename:
            content = await cover.read()
            ext = cover.filename.split(".")[-1].lower()
            path = f"covers/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": cover.content_type})
            cover_url = sb.storage.from_("covers").get_public_url(path)

        data = {
            "title": title,
            "scholar_id": scholar_id or None,
            "category": category,
            "episodes": episodes or 1,
            "duration": duration,
            "file_url": final_url,
            "cover_url": cover_url,
            "description": description,
            "plays": 0,
        }
        res = sb.table("audios").insert(data).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.put("/api/audios/{audio_id}")
async def update_audio(
    audio_id: int,
    title: Optional[str] = Form(None),
    scholar_id: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    episodes: Optional[int] = Form(None),
    duration: Optional[str] = Form(None),
    file_url: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    cover: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        data = {}
        if title: data["title"] = title
        if scholar_id is not None: data["scholar_id"] = scholar_id or None
        if category is not None: data["category"] = category
        if episodes is not None: data["episodes"] = episodes
        if duration is not None: data["duration"] = duration
        if file_url is not None: data["file_url"] = file_url
        if description is not None: data["description"] = description

        if cover and cover.filename:
            content = await cover.read()
            ext = cover.filename.split(".")[-1].lower()
            path = f"covers/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": cover.content_type})
            data["cover_url"] = sb.storage.from_("covers").get_public_url(path)

        res = sb.table("audios").update(data).eq("id", audio_id).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.delete("/api/audios/{audio_id}")
async def delete_audio(audio_id: int, authorization: Optional[str] = Header(None)):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        sb.table("audios").delete().eq("id", audio_id).execute()
        return ok({"deleted": audio_id})
    except Exception as e:
        return err(str(e))

# ─── VIDEOS ────────────────────────────────────────────────────
@app.get("/api/videos")
def get_videos(scholar_id: Optional[str] = None, category: Optional[str] = None, q: Optional[str] = None):
    try:
        query = sb.table("videos").select("*").order("created_at", desc=True)
        if scholar_id: query = query.eq("scholar_id", scholar_id)
        if category:   query = query.eq("category", category)
        res = query.execute()
        data = res.data or []
        if q:
            q_low = q.lower()
            data = [v for v in data if q_low in (v.get("title") or "").lower()]
        return ok(data)
    except Exception as e:
        return err(str(e))

@app.post("/api/videos")
async def create_video(
    title: str = Form(...),
    scholar_id: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    duration: Optional[str] = Form(None),
    video_url: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    thumbnail: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        thumb_url = None
        if thumbnail and thumbnail.filename:
            content = await thumbnail.read()
            ext = thumbnail.filename.split(".")[-1].lower()
            path = f"covers/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": thumbnail.content_type})
            thumb_url = sb.storage.from_("covers").get_public_url(path)

        data = {
            "title": title,
            "scholar_id": scholar_id or None,
            "category": category,
            "duration": duration,
            "video_url": video_url,
            "thumbnail_url": thumb_url,
            "description": description,
            "views": 0,
        }
        res = sb.table("videos").insert(data).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.put("/api/videos/{video_id}")
async def update_video(
    video_id: int,
    title: Optional[str] = Form(None),
    scholar_id: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    duration: Optional[str] = Form(None),
    video_url: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    thumbnail: Optional[UploadFile] = File(None),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        data = {}
        if title: data["title"] = title
        if scholar_id is not None: data["scholar_id"] = scholar_id or None
        if category is not None: data["category"] = category
        if duration is not None: data["duration"] = duration
        if video_url is not None: data["video_url"] = video_url
        if description is not None: data["description"] = description

        if thumbnail and thumbnail.filename:
            content = await thumbnail.read()
            ext = thumbnail.filename.split(".")[-1].lower()
            path = f"covers/{uuid.uuid4()}.{ext}"
            sb.storage.from_("covers").upload(path, content, {"content-type": thumbnail.content_type})
            data["thumbnail_url"] = sb.storage.from_("covers").get_public_url(path)

        res = sb.table("videos").update(data).eq("id", video_id).execute()
        return ok(res.data[0] if res.data else data)
    except Exception as e:
        return err(str(e))

@app.delete("/api/videos/{video_id}")
async def delete_video(video_id: int, authorization: Optional[str] = Header(None)):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        sb.table("videos").delete().eq("id", video_id).execute()
        return ok({"deleted": video_id})
    except Exception as e:
        return err(str(e))

# ─── CATEGORIES ─────────────────────────────────────────────────
@app.get("/api/categories")
def get_categories():
    try:
        res = sb.table("categories").select("*").order("label_fr").execute()
        return ok(res.data or [])
    except Exception as e:
        return err(str(e))

@app.post("/api/categories")
async def create_category(
    label_ar: str = Form(...),
    label_fr: str = Form(...),
    emoji: Optional[str] = Form("📚"),
    color: Optional[str] = Form("blue"),
    authorization: Optional[str] = Header(None),
):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        slug = label_fr.lower().replace(" ", "-")
        res = sb.table("categories").insert({
            "slug": slug, "label_ar": label_ar,
            "label_fr": label_fr, "emoji": emoji, "color": color
        }).execute()
        return ok(res.data[0] if res.data else {})
    except Exception as e:
        return err(str(e))

@app.delete("/api/categories/{cat_id}")
async def delete_category(cat_id: int, authorization: Optional[str] = Header(None)):
    if not await check_admin(authorization):
        return err("Non autorise", 401)
    try:
        sb.table("categories").delete().eq("id", cat_id).execute()
        return ok({"deleted": cat_id})
    except Exception as e:
        return err(str(e))

# ─── AUTH ───────────────────────────────────────────────────────
@app.post("/api/auth/login")
async def login(email: str = Form(...), password: str = Form(...)):
    try:
        res = sb.auth.sign_in_with_password({"email": email, "password": password})
        if not res.user:
            return err("Email ou mot de passe incorrect", 401)
        profile = sb.table("profiles").select("full_name,is_admin").eq("id", res.user.id).single().execute()
        return ok({
            "token": res.session.access_token,
            "user": {
                "id": res.user.id,
                "email": res.user.email,
                "name": profile.data.get("full_name") if profile.data else "",
                "is_admin": profile.data.get("is_admin", False) if profile.data else False,
            }
        })
    except Exception as e:
        return err("Email ou mot de passe incorrect", 401)

@app.post("/api/auth/logout")
async def logout(authorization: Optional[str] = Header(None)):
    try:
        sb.auth.sign_out()
        return ok({"logged_out": True})
    except Exception:
        return ok({"logged_out": True})

@app.get("/api/auth/me")
async def me(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        return err("Non connecte", 401)
    token = authorization.replace("Bearer ", "")
    try:
        user = sb.auth.get_user(token)
        if not user or not user.user:
            return err("Token invalide", 401)
        profile = sb.table("profiles").select("full_name,is_admin").eq("id", user.user.id).single().execute()
        return ok({
            "id": user.user.id,
            "email": user.user.email,
            "name": profile.data.get("full_name") if profile.data else "",
            "is_admin": profile.data.get("is_admin", False) if profile.data else False,
        })
    except Exception as e:
        return err(str(e), 401)

# ─── STATS ──────────────────────────────────────────────────────
@app.get("/api/stats")
def get_stats():
    try:
        scholars = sb.table("scholars").select("id", count="exact").execute()
        books    = sb.table("books").select("id", count="exact").execute()
        audios   = sb.table("audios").select("id", count="exact").execute()
        videos   = sb.table("videos").select("id", count="exact").execute()
        return ok({
            "scholars": scholars.count or 0,
            "books":    books.count or 0,
            "audios":   audios.count or 0,
            "videos":   videos.count or 0,
        })
    except Exception as e:
        return err(str(e))
