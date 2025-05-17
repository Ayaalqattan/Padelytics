from firebase_config import db

def get_all_tournaments():
    tournaments_ref = db.collection('tournaments')
    docs = tournaments_ref.stream()

    tournaments = []
    for doc in docs:
        data = doc.to_dict()
        data['id'] = doc.id

        # معالجة التاريخ
        firebase_date = data.get('date')

        if firebase_date:
            try:
                # لو date جاي كـ Firebase Timestamp
                formatted_date = firebase_date.isoformat()
            except AttributeError:
                # لو جاي كـ string بالفعل
                formatted_date = str(firebase_date)
        else:
            formatted_date = ""

        tournaments.append({
            'id': data.get('id'),
            'tournamentName': data.get('tournamentName'),
            'date': formatted_date,  # ← دي القيمة اللي React هيستخدمها
            'location': data.get('location'),
            'prize': data.get('prize'),
            'registrationFees': data.get('registrationFees'),
            'type': data.get('type'),
            'image': data.get('image'),
            'url': data.get('url'),
        })

    return tournaments
