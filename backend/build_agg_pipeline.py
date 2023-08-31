from datetime import datetime


def get_match_stage(field, values):
  field_in_dict = {}
  field_in_dict[field] = { "$in": values }
  
  stage = {
      "$match": field_in_dict
   }

  return stage


def build_agg_pipeline(filters):
    show_type = filters["type"]
    status = filters["status"]
    rating = filters["rating"]
    mal_score = filters["malScore"]
    years = filters["years"]
    demographic = filters["demographic"]
    genre = filters["genre"]
    theme = filters["theme"]
    studio = filters["studio"]

    min_score, max_score = mal_score
    start_year, end_year = years

    current_year = datetime.now().year

    agg_pipeline = []

    if len(show_type) > 0:
        agg_pipeline.append(get_match_stage("type", show_type))

    if len(status) > 0:
        agg_pipeline.append(get_match_stage("status", status))

    if len(rating) > 0:
        agg_pipeline.append(get_match_stage("rating", rating))

    if len(demographic) > 0:
        agg_pipeline.append(get_match_stage("demographics", demographic))

    # if min_score is 0, dont apply min; if max_score is 10 dont apply max
    use_min_score = min_score > 0
    use_max_score = max_score < 10

    if (use_min_score or use_max_score):
        if (use_min_score and use_max_score):
            agg_pipeline.append({
                "$match": {
                    "score": { "$gt": min_score, "$lt": max_score }
                }
            })
        elif (use_min_score):
            agg_pipeline.append({
                "$match": {
                    "score": { "$gt": min_score }
                }
            })
        else:
            agg_pipeline.append({
                "$match": {
                    "score": { "$lt": max_score }
                }
            })

    # if start_year is 1917, dont apply start; if end_year is current year, dont apply end
    use_start_year = start_year > 1917 or end_year < current_year
    # need to re-scrape to correctly get end years - only use start year for now
    # use_end_year = end_year < current_year

    if (use_start_year):
        agg_pipeline.append({
            "$match": {
                # currently filtering out all shows without a start year (937 total)
                "years.start": { "$ne": None },
                "$expr": {
                    "$and": [
                        { "$gte": [ "$years.start", start_year ] },
                        { "$lte": [ "$years.start", end_year ] }
                    ]
                }
            }
        })

    if len(genre) > 0:
        match_clauses = []

        for clause in genre:
            match_clauses.append({
              "genres": { "$all": clause }
            })

        agg_pipeline.append({
          "$match": {
            "$or": match_clauses
          }
        })

    if len(theme) > 0:
        match_clauses = []

        for clause in theme:
            match_clauses.append({
              "themes": { "$all": clause }
            })

        agg_pipeline.append({
          "$match": {
            "$or": match_clauses
          }
        })

    return agg_pipeline
